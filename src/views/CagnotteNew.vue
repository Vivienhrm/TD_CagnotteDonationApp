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

        <div class="actions">
            <button type="submit" class="btn btn-save" :disabled="loading">
                {{ loading ? 'Création...' : 'Créer' }}
            </button>
            <button type="button" @click="$router.back()" class="btn btn-cancel">Retour</button>
            <router-link to="/" class="btn btn-home">Retour à l'accueil</router-link>
        </div>

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
.actions {
    display: flex;
    gap: 10px;
    margin-top: 1rem;
}
.btn {
    padding: 10px 20px;
    border: none;
    cursor: pointer;
    border-radius: 4px;
    font-size: 1rem;
    color: white;
    text-decoration: none;
    font-weight: bold;
    text-align: center;
}
.btn-save {
    background-color: #4CAF50;
}
.btn-cancel {
    background-color: #9e9e9e;
}
.btn-home {
    background-color: #2196F3;
}
.error {
    color: red;
    margin-top: 1rem;
}
</style>
