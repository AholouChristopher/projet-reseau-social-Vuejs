<template>
    <div class="container d-flex">
        <div class="card" style="width: 18rem;">
            <img src="../assets/images/avatar-1.jpg" class="card-img-top" alt="photo de profil">
            <div class="card-body">
                <p class="card-text">Jean DUPONT</p>
                <p class="card-text">Vendeur</p>
            </div>
        </div>
        <div class="card-description">
            <p>Age : 26 ans</p>
            <p>Genre: homme</p>
            <p>Description metier : je m'occupe des repartion du style</p>
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
