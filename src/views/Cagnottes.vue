<template>
  <div class="cagnottes-view">
    <div class="header">
        <h1>Mes Cagnottes</h1>
        <router-link to="/cagnottes/new" class="create-btn">Créer une cagnotte</router-link>
    </div>

    <!-- Cagnottes Actives -->
    <div class="list-section">
        <h2>En cours</h2>
        <div v-if="activeCagnottes.length === 0" class="empty-state">
            Aucune cagnotte en cours.
        </div>
        <div class="cagnotte-list">
            <Cagnotte
                v-for="cagnotte in activeCagnottes"
                :key="cagnotte.id"
                :cagnotte="cagnotte"
            />
        </div>
    </div>

    <!-- Toggle Cagnottes Terminées -->
    <div class="toggle-section">
        <a href="#" @click.prevent="showFinished = !showFinished">
            {{ showFinished ? 'Masquer' : 'Voir' }} les cagnottes terminées
        </a>
    </div>

    <!-- Cagnottes Terminées -->
    <div v-if="showFinished" class="list-section finished">
        <h2>Terminées</h2>
        <div v-if="finishedCagnottes.length === 0" class="empty-state">
            Aucune cagnotte terminée.
        </div>
        <div class="cagnotte-list">
            <Cagnotte
                v-for="cagnotte in finishedCagnottes"
                :key="cagnotte.id"
                :cagnotte="cagnotte"
            />
        </div>
    </div>
  </div>
</template>

<script>
import Cagnotte from '@/components/Cagnotte.vue'

export default {
  name: 'CagnottesView',
  components: {
    Cagnotte
  },
  data() {
    return {
      cagnottes: [],
      showFinished: false
    }
  },
  computed: {
    activeCagnottes() {
      return this.cagnottes
        .filter(c => {
            const today = new Date().toISOString().split('T')[0];
            return c.end_date >= today;
        })
        .sort((a, b) => new Date(a.end_date) - new Date(b.end_date)); // Closest end date first
    },
    finishedCagnottes() {
      return this.cagnottes
        .filter(c => {
            const today = new Date().toISOString().split('T')[0];
            return c.end_date < today;
        })
        .sort((a, b) => new Date(b.end_date) - new Date(a.end_date)); // Most recently finished first
    }
  },
  mounted() {
    this.fetchCagnottes();
  },
  methods: {
    async fetchCagnottes() {
      try {
        const response = await this.$api.get('/api/cagnottes');
        const cagnottes = response.data;

        // Parallel fetch for donations of each cagnotte to get current amounts
        const cagnottesWithDonations = await Promise.all(cagnottes.map(async (c) => {
            try {
                const donationsRes = await this.$api.get(`/api/cagnottes/${c.id}/donations`);
                const currentAmount = donationsRes.data.reduce((sum, d) => sum + parseFloat(d.amount), 0);
                return { ...c, current_amount: currentAmount };
            } catch (error) {
                console.error("Erreur chargement donations", error);
                return { ...c, current_amount: 0 };
            }
        }));

        this.cagnottes = cagnottesWithDonations;
      } catch (error) {
        console.error("Erreur chargement cagnottes", error);
        alert("Impossible de charger les cagnottes.");
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
    margin-bottom: 2rem;
}

.create-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px 20px;
    text-decoration: none;
    border-radius: 4px;
    font-weight: bold;
}

.cagnotte-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.toggle-section {
    margin: 2rem 0;
    text-align: center;
}

.finished {
    opacity: 0.7;
}
</style>
