import { reactive } from 'vue';

export const userProf = reactive({
    isTeacher: false,
    setIsTeacher(newVal) {
        this.isTeacher = newVal;
    }
})