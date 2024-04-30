appName="cot-dig-suc-bacof-vouchersfront"
# To work correctly, appSourceDir must be pointing to the project "digops-frontend-web"
appSourceDir="." 
appDeployDir="."


appServerDir="/docker_home/deploy/BACKOFFICEDIGITAL/front/vouchers"
start_time=$(date +%s)
# ./build-deploy-cdsige-web.sh test dev patch beta 50000
# 
# 
# 
# ./buildcupos.sh DIGBO-311 qa none none 5201 // test
# script | branch base | environment | versioning | tag if release run release           
# *no auto conventional commits

# Set the branch and environment to deploy (default is master and prod)
branch=${1:-master}
environment=${2:-prod}
versioning=${3:-patch} # List of commands in package.json
subversion=${4:-none} # Tag
port=${5:-80}

tagenv=""

if [ $environment != "prod" ] && [ $environment != "pre-prod" ] && [ $subversion != "none" ] && [ $subversion != "release" ]; then
	tagenv="-$subversion"
fi

# Update the application version
if [ $versioning != "none" ]; then
  echo "Updating application version..."

  cd $appSourceDir
  newversion=$(cat $appSourceDir/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

  git pull origin $branch
  git checkout $branch
  git merge $branch origin/$branch

  yarn $versioning

  git add -A
  git commit -m "$newversion"
  git push origin $branch

  cd ../deploy
fi

# Get version from package.json
version=$(cat $appSourceDir/package.json \
  | grep version \
  | head -1 \
  | awk -F: '{ print $2 }' \
  | sed 's/[",]//g')

# Trim leading spaces
version="${version## }"

if [ $subversion == "release" ]; then
  cd $appSourceDir

  releaseversion="$subversion/$version"
  if git show-ref --verify --quiet refs/heads/$releaseversion; then
    echo "La rama $releaseversion ya existe. Haciendo Checkout..."
    git checkout $releaseversion
    git pull origin $branch
  else
    git checkout -b $releaseversion
  fi
  git push origin $releaseversion
  git checkout $branch 
  cd ../deploy
fi

image="$appName:$version$tagenv"

#: '
set -e

# Check if Docker is installed
if ! command -v docker &> /dev/null; then
  echo "Docker no está instalado. Debe instalarlo para continuar el proceso. Saliendo..."
  exit 1
fi

# Check if Docker is running
if ! docker info &> /dev/null; then
  echo "Docker no está en ejecución. Debe inicializarlo para continuar el proceso. Saliendo..."
  exit 1
fi

# Build and tag the image
echo "Creando la imagen (v$version)..."
docker build --build-arg env=$environment -t $image $appSourceDir

# Generate .tar
docker save -o $appDeployDir/$appName\_$version$tagenv.tar $image
gzip $appDeployDir/$appName\_$version$tagenv.tar

ls -la $appDeployDir

# ' designed server

if [ $environment == "dev" ]; then
  environmentServer="slnxdesa01.redcoto.com.ar"
  designedServer="Desarrollo"
fi

if [ $environment == "test" ] || [ $environment == "sta" ] || [ $environment == "prod" ] || [ $environment == "qa" ]; then
  environmentServer="slnxtest01.redcoto.com.ar"
  designedServer="Test/Producción"
fi

# Send to server
echo "Para enviar la imagen comprimida al servidor necesitas usuario y contraseña del servidor"
echo "Servidor designado para la tarea: $designedServer"
read -p "Desea proceder? (y/N): " confirm

if [[ $confirm =~ ^[Yy]$ ]]; then
  # Code to execute if confirmed
  echo "Procesando..."
  
  echo "Ingrese el usuario del servidor(normalmente legajo o users/legajo): "
  read User

  # Check if the file exists on the destination server
  fileExists=$(ssh $User@$environmentServer "[ -f $appServerDir/$appName\_$version$tagenv.tar.gz ] && echo 'true' || echo 'false'")

  echo  $appDeployDir/$appName\_$version$tagenv.tar.gz
  echo  $appServerDir/$appName\_$version$tagenv.tar.gz
  
  if [[ $fileExists == 'true' ]]; then
    echo "El archivo ya existe en el servidor. Eliminando..."
    ssh $User@$environmentServer "rm -f $appServerDir/$appName\_$version$tagenv.tar.gz"
    
    echo "Reescribiendo..."
  else
    echo "El archivo no existe en el servidor. Copiando..."
  fi

    echo $appDeployDir/$appName\_$version$tagenv.tar.gz
    
    scp $appDeployDir/$appName\_$version$tagenv.tar.gz $User@$environmentServer:$appServerDir/$appName\_$version$tagenv.tar.gz

  # Call the script on the server to deploy
  echo "Ingrese la contraseña para deploy en el servidor "
  ssh $User@$environmentServer "/docker_home/BACKOFFICEDIGITAL/Scripts/deploy-voucher.sh $appName\_$version$tagenv.tar.gz $appName:$version$tagenv $port" 

  # Remove the tar file on local
  rm $appName\_$version$tagenv.tar.gz

else
  # Code to execute if not confirmed
  echo "Operación cancelada. Saliendo..."
fi

end_time=$(date +%s)
echo "Total time: $((end_time-start_time))s"