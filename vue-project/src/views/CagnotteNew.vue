<template>
  <div class="create-cagnotte">
    <h1>Créer une nouvelle cagnotte</h1>
    
    <form @submit.prevent="createCagnotte" class="form">
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

        <button type="submit" class="submit-btn" :disabled="loading">
            {{ loading ? 'Création...' : 'Créer la cagnotte' }}
        </button>
        
        <div v-if="error" class="error">{{ error }}</div>
    </form>
  </div>
</template>

<script>
export default {
  name: 'CagnotteNew',
  data() {
    return {
        form: {
            name: '',
            description: '',
            goal: null,
            end_date: ''
        },
        loading: false,
        error: null
    }
  },
  methods: {
    async createCagnotte() {
        this.loading = true;
        this.error = null;
        try {
            await this.$api.post('/api/cagnottes', this.form);
            this.$router.push('/');
        } catch (e) {
            console.error(e);
            this.error = "Erreur lors de la création de la cagnotte.";
        } finally {
            this.loading = false;
        }
    }
  }
}
</script>

<style scoped>
.form {
    max-width: 500px;
    margin: 0 auto;
}
.form-group {
    margin-bottom: 1rem;
    display: flex;
    flex-direction: column;
}
.submit-btn {
    background-color: #4CAF50;
    color: white;
    padding: 10px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 1rem;
}
.error {
    color: red;
    margin-top: 1rem;
}
</style>
