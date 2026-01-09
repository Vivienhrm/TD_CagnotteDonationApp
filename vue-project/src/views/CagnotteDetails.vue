<template>
  <div class="cagnotte-details" v-if="cagnotte">
    <div class="header">
        <div class="header-main">
            <h1>{{ cagnotte.name }}</h1>
            <p class="summary-stats">
                <strong>Récolté :</strong> {{ formatAmount(currentAmount) }} / {{ formatAmount(cagnotte.goal) }}
                <span class="remaining" :class="{ over: isOverfunded }">
                    (Reste : {{ formatAmount(remainingAmount) }})
                </span>
            </p>
        </div>
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
  computed: {
    currentAmount() {
        return this.cagnotte.donations?.reduce((sum, d) => sum + parseFloat(d.amount), 0) || 0;
    },
    remainingAmount() {
        return this.cagnotte.goal - this.currentAmount;
    },
    isOverfunded() {
        return this.remainingAmount < 0;
    }
  },
  mounted() {
    this.fetchCagnotte();
  },
  methods: {
    async fetchCagnotte() {
      try {
        const id = this.$route.params.id;
        // Fetch both simultaneously
        const [cagnotteRes, donationsRes] = await Promise.all([
            this.$api.get(`/api/cagnottes/${id}`),
            this.$api.get(`/api/cagnottes/${id}/donations`)
        ]);
        
        // Merge donations into the cagnotte object
        this.cagnotte = {
            ...cagnotteRes.data,
            donations: donationsRes.data
        };
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
    align-items: flex-start;
    margin-bottom: 20px;
}
.header-main h1 { margin: 0; }
.summary-stats { margin: 5px 0 0 0; color: #555; }
.remaining { margin-left: 10px; font-weight: 500; }
.remaining.over { color: #2e7d32; }
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
