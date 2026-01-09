<template>
  <div class="edit-cagnotte" v-if="form">
    <h1>Modifier la cagnotte</h1>
    
    <form @submit.prevent="updateCagnotte" class="form">
        <div class="form-group">
            <label>Nom</label>
            <input type="text" v-model="form.name" v-focus required>
        </div>

        <div class="form-group">
            <label>Description</label>
            <textarea v-model="form.description" required></textarea>
        </div>

        <div class="form-group">
            <label>Objectif (€)</label>
            <input type="number" v-model="form.goal" min="1" step="0.01" required>
        </div>

        <div class="form-group">
            <label>Date de fin</label>
            <input type="date" v-model="form.end_date" required>
        </div>

        <div class="actions">
            <button type="submit" class="btn btn-save" :disabled="loading">
                {{ loading ? 'Enregistrement...' : 'Sauvegarder' }}
            </button>
            <button type="button" @click="$router.back()" class="btn btn-cancel">Annuler</button>
        </div>
        
        <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CagnotteEdit',
  data() {
    return {
        form: null,
        loading: false,
        error: null
    }
  },
  mounted() {
    this.fetchCagnotte();
  },
  methods: {
    async fetchCagnotte() {
        try {
            const response = await this.$api.get(`/api/cagnottes/${this.$route.params.id}`);
            this.form = { ...response.data };
        } catch (e) {
            alert("Erreur lors du chargement de la cagnotte.");
            this.$router.push('/');
        }
    },
    async updateCagnotte() {
        this.loading = true;
        this.error = null;
        try {
            await this.$api.put(`/api/cagnottes/${this.$route.params.id}`, this.form);
            this.$router.push(`/cagnottes/${this.$route.params.id}/infos`);
        } catch (e) {
            this.error = "Erreur lors de la modification.";
        } finally {
            this.loading = false;
        }
    }
  }
}
</script>

<style scoped>
.form { max-width: 500px; margin: 20px auto; }
.form-group { margin-bottom: 15px; display: flex; flex-direction: column; }
.actions { display: flex; gap: 10px; margin-top: 20px; }
.btn { padding: 10px 20px; border: none; border-radius: 4px; color: white; cursor: pointer; font-weight: bold; }
.btn-save { background-color: #4CAF50; }
.btn-cancel { background-color: #9e9e9e; }
.error { color: red; margin-top: 10px; }
</style>
