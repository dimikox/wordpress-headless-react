import create from "zustand";
import { getAllPages, getAllPosts } from "../app/api/data"

const useData = create((set, get) => ({
    pages: [],
    posts: [],
    loading: false,
    hasErrors: false,
    getPages: async () => {
        set(() => ({ loading: true }));
        const response = await getAllPages()
        set((state) => ({ pages: (state.pages = response.pages.nodes), loading: false }));
    },
    getPosts: async () => {
        set(() => ({ loading: true }));
        const response = await getAllPosts()
        set((state) => ({ posts: (state.posts = response.posts.nodes), loading: false }));
    },
}));

export default useData;
