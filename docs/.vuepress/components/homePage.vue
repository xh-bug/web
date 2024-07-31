<template>
  <div class="bg">

    <div class="el-main"> <span class="nameDevise">xh_Bug</span>
    <p class="Devise">———Front End Developer</p>
    </div>

  </div>

</template>

<script>
export default {};
</script>

<style scoped>
.bg {
  overflow: hidden;
  background-image: url("../img/bgc1.jpg");
  background-repeat: no-repeat;
  background-size: cover;
}
.el-main{
overflow: hidden;
margin-top: 100px;
margin-left: 100px;

}
.nameDevise {
  color: #fff;
  font-size: 80px;
  font-family: Monospace;
  color: hsl(184, 80%, 25%);
  text-shadow: 0 0 1px currentColor,
    /*highlight*/-1px -1px 1px hsl(184, 80%, 50%), 0 -1px 1px hsl(184, 80%, 55%),
    1px -1px 1px hsl(184, 80%, 50%),
    /*light shadow*/ 1px 1px 1px hsl(184, 80%, 10%),
    0 1px 1px hsl(184, 80%, 10%), -1px 1px 1px hsl(184, 80%, 10%),
    /*outline*/-2px -2px 1px hsl(184, 80%, 15%),
    -1px -2px 1px hsl(184, 80%, 15%), 0 -2px 1px hsl(184, 80%, 15%),
    1px -2px 1px hsl(184, 80%, 15%), 2px -2px 1px hsl(184, 80%, 15%),
    2px -1px 1px hsl(184, 80%, 15%), 2px 0 1px hsl(184, 80%, 15%),
    2px 1px 1px hsl(184, 80%, 15%), -2px 0 1px hsl(184, 80%, 15%),
    -2px -1px 1px hsl(184, 80%, 15%), -2px 1px 1px hsl(184, 80%, 15%),
    /*dark shadow*/ 2px 2px 2px hsl(184, 80%, 5%), 1px 2px 2px hsl(184, 80%, 5%),
    0 2px 2px hsl(184, 80%, 5%), -1px 2px 2px hsl(184, 80%, 5%),
    -2px 2px 2px hsl(184, 80%, 5%);
}
.Devise{
  font-size: 40px;
  color: rgba(255,255,255,0.6);
  font-weight: bold;
}
</style>