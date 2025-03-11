import { APIRequestContext } from '@playwright/test';

export class API_Helper {

    static async getUser(request: APIRequestContext, userId: number) {
        return await request.get(`users/${userId}`);
    }

    static async getUsers(request: APIRequestContext, page: number) {
        return await request.get(`users?page=${page}`);
    }

    static async createUser(request: APIRequestContext, userData: object) {
        return await request.post('users', { data: userData });
    }

    static async loginUser(request: APIRequestContext, userData: object) {
        return await request.post('login', { data: userData });
    }

    static async deleteUser(request: APIRequestContext, userId: number) {
        return await request.delete(`users/${userId}`);
    }

    static async updateUser(request: APIRequestContext, userId: number, name: string, job: string) {
        return await request.put(`users/${userId}`, { data: { name, job } });
    }

    static async getUsersWithDelay(request: APIRequestContext, delay: number) {
        return await request.get(`users?delay=${delay}`);
    }
}