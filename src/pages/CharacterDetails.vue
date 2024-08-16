<template>
    <v-main>
        <v-container>
            <v-row>
                <v-col class="d-flex justify-right align-center">
                    <router-link to="characters" class="link text-h6 d-flex align-center" @click="goBack"> 
                        <v-icon icon="mdi-arrow-left"></v-icon>
                        GO BACK
                    </router-link>
                </v-col>
                <v-col class="d-flex justify-center align-center" cols="12">
                    <v-img   max-width="300px" class="border-lg border-primary rounded-circle" alt="avatar of character">
                    </v-img>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12" class= "text-center">
                    <h1>{{}}</h1>
                </v-col>
            </v-row>

        </v-container>
        <v-container>
            <v-row>
                <v-col cols="6" class="d-flex justify-center align-center">
                    <v-table style="width: 100%;">
                        <thead class="text-left">
                            <tr>
                                <th>
                                    Informations
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Gender</div>{{}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Status</div>{{}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Specie</div>{{}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Origin</div>{{}}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Type</div>
                                    <div>
                                        {{ }}
                                    </div>
                                    <p>
                                        Unknown
                                    </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div class="text-subtitle-2 font-black">Location</div>{{}}
                                </td>
                            </tr>
                        </tbody>
                    </v-table>
                </v-col>
                <v-col cols="6" class="d-flex justify-right align-center">
                    <v-table style="width: 100%;">
                        <t-head>
                            <tr>
                                <th>
                                    Episodes
                                </th>
                            </tr>
                        </t-head>
                        <t-body>
                            <tr>
                            </tr>
                        </t-body>
                    </v-table>
                </v-col>
            </v-row>
        </v-container>
            
   
    </v-main>   

    
</template>
 


<script setup lang="ts">
import { ref } from 'vue'; 
import { useRoute, useRouter } from 'vue-router';
import { Character } from './Characters.vue'; 
import CharacterDetailsApi from '../api/characterDetailsApi';


const route :any = useRoute();
const router = useRouter();

const characterInfo = ref<Character | null>(null);

const fetchCharacterInfo = async (id: string) =>{
    try {
        characterInfo.value = await CharacterDetailsApi.getCharacterInfo(id);
        
        console.log("characterInfo.value", characterInfo.value)
    } catch (error) {
        console.error('Failed to fetch character info:', error);
        
    }
} 
onMounted(() => {
    fetchCharacterInfo(route.params.id)
})  

const goBack = () => {
  router.back();
};
    
</script>
  
<style scoped>
h1{
    font-family:Roboto;
    font-weight:400;
    font-size:48px;
}
th{
font-family: Roboto;
font-size: 20px;
font-weight: 500;
line-height: 24px;
text-align: left;
color: #8E8E93;
}
td div{
font-family: Roboto;
font-size: 16px;
font-weight: 700;
line-height: 24px;
letter-spacing: 0.15000000596046448px;
text-align: left;
color:black
}
td{
font-family: Roboto;
font-size: 14px;
font-weight: 400;
line-height: 20px;
letter-spacing: 0.25px;
text-align: left;
color: #6E798C;
}
</style>



