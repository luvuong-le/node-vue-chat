// import { shallowMount } from "@vue/test-utils";
import Home from '@/views/Home.vue';

describe('Home.vue', () => {
    it('Should have a mounted lifecycle hook', () => {
        expect(typeof Home.mounted).toBe('function');
    });
});
