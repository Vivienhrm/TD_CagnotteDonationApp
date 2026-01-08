<template>
  <div class="cagnotte-details" v-if="cagnotte">
    <div class="header">
        <h1>{{ cagnotte.name }}</h1>
        <div class="actions">
            <router-link :to="`/cagnottes/${cagnotte.id}/edit`" class="btn btn-edit">Éditer</router-link>
            <button @click="deleteCagnotte" class="btn btn-delete">Supprimer</button>
        </div>
    </div>

    <nav class="tabs">
        <router-link :to="`/cagnottes/${cagnotte.id}/infos`" class="tab-link" active-class="active">Infos</router-link>
        <router-link :to="`/cagnottes/${cagnotte.id}/donations`" class="tab-link" active-class="active">Donations</router-link>
    </nav>

    <div class="tab-content">
        <router-view :cagnotte="cagnotte" @refresh="fetchCagnotte"></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CagnotteDetails',
  data() {
    return {
      cagnotte: null
    }
  },
  mounted() {
    this.fetchCagnotte();
  },
  methods: {
    async fetchCagnotte() {
      try {
        const response = await this.$api.get(`/api/cagnottes/${this.$route.params.id}`);
        this.cagnotte = response.data;
      } catch (error) {
        console.error("Erreur chargement cagnotte", error);
        alert("Impossible de charger cette cagnotte.");
        this.$router.push('/');
      }
    },
    async deleteCagnotte() {
        if (confirm("Voulez-vous vraiment supprimer cette cagnotte ?")) {
            try {
                await this.$api.delete(`/api/cagnottes/${this.$route.params.id}`);
                this.$router.push('/');
            } catch (e) {
                alert("Erreur lors de la suppression.");
            }
        }
    }
  }
}
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
.actions {
    display: flex;
    gap: 10px;
}
.btn {
    padding: 8px 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    text-decoration: none;
    font-weight: bold;
    color: white;
}
.btn-edit { background-color: #2196f3; }
.btn-delete { background-color: #f44336; }

.tabs {
    display: flex;
    border-bottom: 2px solid #ddd;
    margin-bottom: 20px;
}
.tab-link {
    padding: 10px 20px;
    text-decoration: none;
    color: #666;
    border-bottom: 2px solid transparent;
    margin-bottom: -2px;
}
.tab-link.active {
    color: #2196f3;
    border-bottom-color: #2196f3;
    font-weight: bold;
}
.tab-content {
    background: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
}
</style>
