<template>
<div>
    <NavBar />
    <h1>Facts</h1>


<div style="display: inline-block';
                position: absolute;
                bottom: 5%;
                width: 40%;
                height: 60%;
                left: 5%; border: 2px solid black;"> 
    <h3> texts</h3>
    </div>
    
    <div style="display: inline-block';
                position: absolute;
                bottom: 5%;
                width: 40%;
                height: 60%;
                left: 55%; border: 2px solid black;"> 
    <h3> texts</h3>
    </div>
</div>
</template>

<script>
// @ is an alias to /src
import NavBar from "@/components/NavBar.vue";
export default {
    name: "Facts",
    components: {
        NavBar
    },
};
</script>