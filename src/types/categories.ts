export interface subCategories {
    categoryId:string,
    subcategory:string,
    id:string,
    imageUrl:string,
    description:string,
}

export interface Categories {
    id:string,
    category:string,
    imageUrl:string,
    description:string,
    subcategories:subCategories[]
}