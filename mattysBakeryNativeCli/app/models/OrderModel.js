/**
 * Order Model as defined in Strapi
 */


 import {edit, save, dismiss} from '../controllers/OrderController';

 class OrderModel {
     constructor(user, items, status, paid = false, payment_confirmation, order_id ){
         this.user = user;
         this.items = items;
         this.status = status;
         this.paid  = paid;
         this.payment_confirmation = payment_confirmation;
         this.order_id = order_id;
     }

     async save() {
         //save the order to Strapi
         const order_id = await save(this);

         if (!order_id) {
             throw new Error("Order could not be saved");
         }

         this.order_id = order_id;
         return true;


     }

     async edit() {
         if(!this.id) {
             throw new Error('Cannot edit Order before it was saved.');
         }

         const edited = await edit(this);

         if(!edited){
             throw new Error('Order could not be edited.')
         }

         return true;
     }

     async dismiss()  {
         if(!this.id){
             throw new Error('Cannot delete Order before it was saved.')
         }

         const dismissed  = await dismiss(this);

         if(!dismissed){
             throw new Error('Order could not be deleted')
         }

         return true;
     }
 }

 export default OrderModel;