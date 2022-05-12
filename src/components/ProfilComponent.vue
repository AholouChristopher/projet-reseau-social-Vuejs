<template>
    <div class="container d-flex">
        <div class="card" style="width: 18rem;">
            <img src="../assets/images/avatar-1.jpg" class="card-img-top" alt="photo de profil">
            <div class="card-body">
                <p class="card-text">Jean DUPONT</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'ProfilComponent'
}
</script>

<style>
.card{ margin-top:100px; border-radius:10px;}
.card-description{
    font-size: 1.5rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left:3rem;
}
</style>
