import { sum } from '../sum';
    
describe('summation of 2 numbers',()=>{
    it("testsum",()=>{
        expect(sum(1,1)).toBe(2);
    })
})