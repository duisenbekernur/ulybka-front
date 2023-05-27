<template>
    <div class="intro h-[95vh] mx-auto">
        <div
                class="relative w-[1280px] h-[70%] mt-16 mx-auto border-8 border-yellow-300 p-8 flex justify-between"
        >
            <div class="w-1/2">
                <h1 class="text-5xl text-white leading-snug mb-3">Ulybka цифрлық стоматология клиникасы</h1>
                <p class="text-2xl text-white">біздің команда мен жабдықтардың арқасында біз миллиметрлік дәлдікпен
                    өңдейміз.</p>
            </div>
            <el-form class="w-1/3 bg-white h-full p-8 text-center flex flex-col justify-around">
                <div>
                    <h3 class="text-2xl mb-3">Емдеудің алдын ала құнын біліңіз</h3>
                    <p class="text-lg leading-5 text-gray-400 mb-6">
                        Менеджер форманы жібергеннен кейін 10 минуттан кейін сізбен байланысады
                    </p>
                </div>
                <div>
                    <el-input v-model="signDatas.description" size="large" class="mb-4" placeholder="Имя"/>
                    <el-input
                            v-model="signDatas.phone"
                            size="large"
                            class="mb-2"
                            placeholder="Номер телефона"
                    />
                    <p class="text-sm leading-5 text-gray-400 mb-6 text-left">
                        телефон 8-ден басталуы керек
                    </p>
                </div>
                <el-button v-loading="loading" @click="sign" type="primary" size="large" class="">
                    Тіркелу
                </el-button>
            </el-form>
            <img
                    class="absolute w-3/12 md:w-3/12 left-8 -bottom-32 rounded-full"
                    src="../../assets/intro-man.jpg"
                    alt="man"
            />
        </div>

        <div class="text-white text-xl flex gap-8 w-[1280px] justify-between">
            <div></div>
            <div class="flex gap-32 mt-4">
                <div>
                    <p>Қызметтердің кең ауқымы</p>
                    <p>Жұмыстың заңды кепілдігі</p>
                </div>
                <div>
                    <p>Кәсіби жабдық</p>
                    <p>Тұрақты клиенттерге арналған жеңілдіктер</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {axiosInstance} from "@/axios";

export default {
    name: "Intro",
    data() {
        return {
            loading: false,
            signDatas: {
                phone: "",
                description: "",
            },
        };
    },
    methods: {
        async sign() {
            this.loading = true;
            let response = await axiosInstance.post("/sign/signByPhone", {
                phone: "",
                description: "",
            });
            this.loading = false;
            this.$toast.success("Успешно!");
        },
    },
};
</script>

<style scoped>
* {
    box-sizing: border-box;
}

.intro {
    background-image: url("../../assets/intro-bg.jpg");
    background-color: #000;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media screen and (max-width: 1280px) {
        width: 1280px;
        height: 900px;
    }
}
</style>
