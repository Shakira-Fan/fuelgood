<template>
    <div class="cardComponent flex justify-content-center align-items-center container my-5">
        <h2 class="mb-5">Fuel Good 獨家特色</h2>
        <div class="row flex justify-content-center align-items-stretch">
            <div class="col-10 col-lg-3 col-sm-6 my-3">
                <div class="card h-100">
                        <div class="img-container">
                            <img class="img-fluid" src="../assets/images/Fuelgood__4_-removebg-preview.png" alt="">
                        </div>
                        <h3>跨買隨取</h3>
                        <p>不怕油價波動！<br/>逢低買進，逢高使用最實惠！</p>
                </div>
            </div>
            <div class="col-10 col-lg-3 col-sm-6 my-3">
                <div class="card h-100">
                    <div class="img-container">
                        <img class="img-fluid" src="../assets/images/Fuelgood-removebg-preview.png" alt="">
                    </div>
                    <h3>輕鬆加油</h3>
                    <p>線上查找距離最近配合之據點，加油無須跑遠！</p>
                </div>
            </div>
            <div class="col-10 col-lg-3 col-sm-6 my-3">
                <div class="card h-100">
                    <div class="img-container">
                        <img class="img-fluid" src="../assets/images/Fuelgood__3_-removebg-preview.png" alt="">
                    </div>
                    <h3>數位管理</h3>
                    <p>登入帳戶即可查看油量庫存及歷史交易紀錄，每一滴油都清清楚楚。</p>
                </div>
            </div>
            <div class="col-10 col-lg-3 col-sm-6 my-3">
                <div class="card h-100">
                    <div class="img-container">
                        <img class="img-fluid" src="../assets/images/Fuelgood__1_-removebg-preview.png" alt="">
                    </div>
                    <h3>QRcode提領</h3>
                    <p>一次性QRcode憑證領用汽油，快速方便且兼顧資安！</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
@import 'bootstrap/scss/bootstrap';

.cardComponent{
        min-height: 50vh;
        
        h2{
        font-size:  4rem;
    }
    .row{
        .card{
        padding: 2rem;
        border: none;
        border-radius: 1.5rem;
        box-shadow: 0px 5px 30px -5px rgba(0, 0, 0, 0.17);
        margin: 0 1rem;

        &:hover{
        transition: all ease-out 0.3s;
        box-shadow:
        0px 0px 2.7px rgba(0, 0, 0, 0.042),
        0px 0px 7.5px rgba(0, 0, 0, 0.06),
        0px 0px 18.1px rgba(0, 0, 0, 0.078),
        0px 0px 60px rgba(0, 0, 0, 0.12)
        }

        .img-container{
            overflow: hidden;
            img{
            object-fit: cover;
            &:hover{
                transition: all ease-out 0.3s;
                transform: scale(1.3);
            }
            }
        }

    h3{
        margin-top: 1.5rem;
        font-size: 3rem;
    }
    p{
        font-size: 1.5rem;
    }

    }

    }
    


}





</style>`