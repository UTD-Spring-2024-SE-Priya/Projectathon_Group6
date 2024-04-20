// Collections 

export type CreateCollectionInput = {
    userId: number;
    collectionTitle: string;
    collectionDescription?: string;
}

export type UpdateCollectionInput = {
    collectionId: number;
    collectionTitle: string;
    collectionDescription?: string;
}

export type DeleteCollectionInput = {
    collectionId: number;
}

export type AddIdeaToLikedCollectionInput = {
    userId: number;
    ideaId: number;
}

export type GetIdeasInCollectionInput = {
    collectionId: number;
}

export type AddIdeaToCollectionInput = {
    collectionId: number;
    ideaId: number;
}

export type GetCollectionsForUserInput = {
    userId: number;
}
