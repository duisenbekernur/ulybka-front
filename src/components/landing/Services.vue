<template>
    <div id="services" class="w-[1280px] text-center my-16 mx-auto">
        <h1 class="text-5xl font-medium mb-12" >Наши услуги</h1>

        <div class="flex w-full flex-wrap justify-between gap-8">
            <div v-for="i in services" class="w-[31%] border bg-black relative cursor-pointer hover:scale-105 transition shadow-5xl shadow-cyan-600">
                <img src="../../assets/intro-man.jpg" class=" opacity-50 bg-contain"/>
                <div class="absolute top-0 h-full">
                    <div class="p-8 text-white flex flex-col gap-8 h-full">
                        <h2 class="text-3xl mb-2 font-medium">Продукты</h2>
                        <p class="text-xl font-thin">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
                            doloribus est quae, qui
                            quisquam
                            quod!
                            Ipsum officia, reiciendis?</p>
                        <el-button type="primary" size="large" class="absolute bottom-8 right-0 left-0 m-auto w-1/2">
                            Оставит заявку
                        </el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Services",
    data() {
        return {
            services: [
                {},
                {},
                {},
                {},
                {},
                {},
            ]
        }
    }
}
</script>

<style scoped>

</style>