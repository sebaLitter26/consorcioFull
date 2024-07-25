import { InputType, registerEnumType } from '@nestjs/graphql';
import { Order } from 'src/shared/functions/order';

export enum ProductOrderField {
  id = 'id',
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  name = 'name',
  description = 'description',
}

registerEnumType(ProductOrderField, {
  name: 'ProductOrderField',
  description: 'Properties by which product connections can be ordered.',
});

@InputType()
export class OrderProductDTO extends Order  {
  field: ProductOrderField;
}
