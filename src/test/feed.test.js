import { app } from "../main.js";
import request from "supertest";
import { generateTestToken } from "./getTestToken.js";


describe("Get /feed", () => {
    let token = generateTestToken();
    it('should return status 200 and feed array', async () => {
        const res = await request(app).get('/api/feed').set({ 'Authorization': `Bearer ${token}` });
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty("feeds");
        expect(Array.isArray(res.body.feeds)).toBe(true);
    })

    it('should support pagination', async () => {
        const res = await request(app).get('/api/feed?page=1&limit=2').set({ 'Authorization': `Bearer ${token}` });
        expect(res.body).toHaveProperty('currentPage', 1);
        expect(res.body.feeds.length).toBeLessThanOrEqual(2);
    });

    it('should filter by status', async () => {


        const res = await request(app).get('/api/feed?status=published').set({ 'Authorization': `Bearer ${token}` });
        expect(res.body.feeds.every(feed => feed.status === 'published')).toBe(true);
    });
})


describe("All test For user role " ,  () => {
    let token = generateTestToken({email : "user@email.com" , password: "user123"});
    it('should return status 200 and feed array', async () => {
        const res = await request(app).post('/api/feed').set({ 'Authorization': `Bearer ${token}` });
        expect(res.status).toBe(403)
        expect(res.body).toHaveProperty('error')
    })
})
