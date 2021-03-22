import { Comment } from "./comment";

export interface Product {
  name: string
  width: number | null
  height: number | null
  weight: number | null
  imageUrl: string
  description: string
  count: number | null
  color: string
  id: number | null
  comments: Comment[]
}

export const productInstance: Product = {
  name: '',
  width: null,
  height: null,
  weight: null,
  imageUrl: '',
  description: '',
  count: null,
  color: '',
  id: null,
  comments: []
}

