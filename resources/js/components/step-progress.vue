<template>
    <div class="steps" style="margin-bottom: 20px">
        <ul class="steps-container">
            <li style="width:33%;" class="activated">
                <div class="step">
                    <div class="step-image"><span></span></div>
                    <div class="step-current">Etapa 1</div>
                    <!--<div class="step-description">Contexto</div>-->
                </div>
            </li>
            <li style="width:33%;">
                <div class="step">
                    <div class="step-image"><span></span></div>
                    <div class="step-current">Etapa 2</div>
                    <!--<div class="step-description">Selecionar</div>-->
                </div>
            </li>
            <li style="width:33%;">
                <div class="step">
                    <div class="step-image"><span></span></div>
                    <div class="step-current">Etapa 3</div>
                    <!--<div class="step-description">Finalizar</div>-->
                </div>
            </li>
        </ul>
        <div class="step-bar" style="width: 33%;"></div>
    </div>
</template>

<script>
    export default {
        props:{

        },

        data(){
            return {

            }
        },

        updated(){

        },

        mounted() {
        }
    }
</script>

<style scoped>
    .steps{min-height:90px;padding:30px 0 0 0;font-family:'Open Sans', sans-serif;position:relative}.steps .steps-container{background:#DDD;height:10px;width:100%;border-radius:10px   ;-moz-border-radius:10px   ;-webkit-border-radius:10px   ;-ms-border-radius:10px   ;margin:0;list-style:none}.steps .steps-container li{text-align:center;list-style:none;float:left}.steps .steps-container li .step{padding:0 50px}.steps .steps-container li .step .step-image{margin:-14px 0 0 0}.steps .steps-container li .step .step-image span{background-color:#DDD;display:block;width:37px;height:37px;margin:0 auto;border-radius:37px   ;-moz-border-radius:37px   ;-webkit-border-radius:37px   ;-ms-border-radius:37px   }.steps .steps-container li .step .step-current{font-size:11px;font-style:italic;color:#999;margin:8px 0 0 0}.steps .steps-container li .step .step-description{font-size:13px;font-style:italic;color:#538897}.steps .steps-container li.activated .step .step-image span{background-color:#5DC177}.steps .steps-container li.activated .step .step-image span:after{background-color:#FFF;display:block;content:'';position:absolute;z-index:1;width:27px;height:27px;margin:5px;border-radius:27px   ;-moz-border-radius:27px   ;-webkit-border-radius:27px   ;-ms-border-radius:27px   ;box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.15) ;-moz-box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.15) ;-webkit-box-shadow: 4px 4px 0px 0px rgba(0,0,0,0.15) }.steps .step-bar{background-color:#5DC177;height:10px;position:absolute;top:30px;border-radius:10px 0 0 10px;-moz-border-radius:10px 0 0 10px;-webkit-border-radius:10px 0 0 10px;-ms-border-radius:10px 0 0 10px}.steps .step-bar.last{border-radius:10px   ;-moz-border-radius:10px   ;-webkit-border-radius:10px   ;-ms-border-radius:10px   }
</style>
