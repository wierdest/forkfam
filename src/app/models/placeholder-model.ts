import { Item } from "./item.model";

export class PlaceholderItems {
    static getItems() : Item[] {
        const items : Item[] = [
            {
                title: 'Egg Paprica',
                subtitle: "Scrambled eggs seasoned with a flavorful paprika twist, a delightful breakfast choice.",
                content: 'Some more information',
                imagePath:  'image-a.png',
                id: 0,
                author: 'KindChef420',
            },
            {
                title: 'Beef Burger',
                subtitle: "Juicy beef patty layered with fresh veggies and tangy sauces, a classic comfort meal.",
                content: 'Some more information',
                imagePath: 'image-b.png',
                id: 0,
                author: 'ParsleyHeart133',
            },
            {
                title: 'Rice Bowl',
                subtitle: "A colorful bowl packed with nutritious goodness, featuring aromatic rice and a variety of fresh toppings.",
                content: 'Some more information',
                imagePath: 'image-c.png',
                id: 0,
                author: 'CommunistGordonRamsay',
            },
            {
                title: 'Pizza',
                subtitle: "Oven-baked dough topped with melted cheese and your favorite savory ingredients, a slice of Italy in every bite.",
                content: 'Some more information',
                imagePath: 'image-d.png',
                id: 0,
                author: 'GrillMasterOfNone92',
            },
            {
                title: 'Grilled Beef',
                subtitle: 'Spicy grilled beef with special seasoning',
                content: 'Some more information',
                imagePath: 'image-e.png',
                id: 0,
                author: 'GrillMasterOfNone92'
            },
            {
                title: 'Meat Balls',
                subtitle: 'Flavoured meatballs with vegetables',
                content: 'Some more information',
                imagePath: 'image-f.png',
                id:0,
                author: 'CommunistGordonRamsay',
            },
            {
                title: 'Steak',
                subtitle: 'Barbeques Steak with lettuce and cheese',
                content: 'Some more information',
                imagePath: 'image-g.png',
                id:0,
                author: 'ParsleyHeart133',
            },

        ]
        return items;
    }
}