import { Injectable, Scope } from '@nestjs/common';
const qrcode = require("qrcode-terminal");
import { Client, LocalAuth } from "whatsapp-web.js";

@Injectable({ scope: Scope.TRANSIENT })
export class WhatsappService {
    
  client;
  

  public constructor() {
   
    
    /* {
        clientId: "client-one" //Un identificador(Sugiero que no lo modifiques)
   }
   puppeteer: {
        headless: false
    }
   */
    this.client = new Client({
      authStrategy: new LocalAuth()
    })

    this.client.initialize();

    this.client.on("qr", (qr) => {
      qrcode.generate(qr, { small: true });
    });
    
    this.client.on("authenticated", (session) => {
    
      console.log("AUTHENTICATED", session);
    });
    
    this.client.on("ready", () => {
      console.log("Client is ready!");
      /*this.client.getChats().then(chats => {
        console.log(chats);
        
         const myGroup = chats.find(id => id.name === "Wall-E")
        client.sendMessage(myGroup.id._serialized, "Walle alive!") 
      });
      */
    });

    this.client.on("message", (message) => {
      if (message.body === "Hola") {
        console.log(message);
        
        message.reply(`Hola ${message.notifyName}`);
      }
    });
    
    
    
    
  }

  sendMessage(number: number, text: string){
    try{
        this.client.sendMessage( `549${number}@c.us`,text)
        .then(msg=> console.log(`Message sent to 549${number}`, msg))
        .catch(err=> console.log(err));
    }catch(e){
        console.log(e);
        
    }
    
    
    
  }
}
