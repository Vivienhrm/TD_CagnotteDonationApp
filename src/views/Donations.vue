<template>
  <div class="donations-container">
    <h3>{{ isEditing ? 'Modifier la donation' : 'Nouvelle donation' }}</h3>
    
    <form @submit.prevent="submitForm" class="donation-form">
        <div class="form-row">
            <div class="form-group">
                <label>Donateur</label>
                <input type="text" v-model="form.donator" ref="donatorInput" v-focus placeholder="Nom (ou vide pour anonyme)">
            </div>
            <div class="form-group">
                <label>Montant (€)</label>
                <input type="number" v-model="form.amount" min="1" step="0.01" required>
            </div>
        </div>
        <div class="form-group">
            <label>Commentaire</label>
            <textarea v-model="form.comment" placeholder="Laisser un message..."></textarea>
        </div>
        
        <div class="form-actions">
            <button type="submit" class="btn btn-submit" :disabled="loading">
                {{ loading ? 'Envoi...' : (isEditing ? 'Mettre à jour' : 'Ajouter') }}
            </button>
            <button v-if="isEditing" type="button" @click="resetForm" class="btn btn-cancel">Annuler</button>
        </div>
        
        <div v-if="error" class="error">{{ error }}</div>
    </form>

    <hr>

    <div class="donations-list-wrapper">
        <h4>Liste des donations ({{ donations.length }})</h4>
        
        <TransitionGroup name="list" tag="div" class="donations-list">
            <Donation 
                v-for="donation in sortedDonations" 
                :key="donation.id" 
                :donation="donation"
                @edit="prepareEdit"
                @delete="deleteDonation"
            />
        </TransitionGroup>

        <div v-if="donations.length === 0" class="empty">
            Aucun don pour le moment. Soyez le premier !
        </div>
    </div>
  </div>
</template>

<script>
import Donation from '@/components/Donation.vue'

export default {
  name: 'Donations',
  components: { Donation },
  props: {
    cagnotte: { type: Object, required: true }
  },
  data() {
    return {
        donations: [],
        form: {
            donator: '',
            amount: null,
            comment: ''
        },
        editingId: null,
        loading: false,
        error: null
    }
  },
  computed: {
    isEditing() {
        return this.editingId !== null;
    },
    sortedDonations() {
        // Most recent first
        return [...this.donations].sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    }
  },
  created() {
    this.fetchDonations();
  },
  methods: {
    async fetchDonations() {
        try {
            const response = await this.$api.get(`/api/cagnottes/${this.$route.params.id}/donations`);
            this.donations = response.data;
        } catch (e) {
            console.error(e);
        }
    },
    async submitForm() {
        this.loading = true;
        this.error = null;
        try {
            const id = this.$route.params.id;
            if (this.isEditing) {
                const response = await this.$api.put(`/api/cagnottes/${id}/donations/${this.editingId}`, this.form);
                const index = this.donations.findIndex(d => d.id === this.editingId);
                this.donations[index] = response.data;
            } else {
                const response = await this.$api.post(`/api/cagnottes/${id}/donations`, this.form);
                this.donations.push(response.data);
            }
            this.resetForm();
            this.$emit('refresh'); // Refresh parent Cagnotte stats
        } catch (e) {
            this.error = "Une erreur est survenue lors de la validation.";
        } finally {
            this.loading = false;
        }
    },
    prepareEdit(donation) {
        this.editingId = donation.id;
        this.form = {
            donator: donation.donator,
            amount: donation.amount,
            comment: donation.comment
        };
        this.focusInput();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    },
    async deleteDonation(did) {
        try {
            const id = this.$route.params.id;
            await this.$api.delete(`/api/cagnottes/${id}/donations/${did}`);
            this.donations = this.donations.filter(d => d.id !== did);
            this.$emit('refresh'); // Refresh parent Cagnotte stats
        } catch (e) {
            alert("Erreur lors de la suppression.");
        }
    },
    resetForm() {
        this.editingId = null;
        this.form = {
            donator: '',
            amount: null,
            comment: ''
        };
        this.error = null;
        this.$nextTick(() => this.focusInput());
    },
    focusInput() {
        if (this.$refs.donatorInput) {
            this.$refs.donatorInput.focus();
        }
    }
  }
}
</script>

<style scoped>
.donation-form {
    background: #f1f8e9;
    padding: 20px;
    border-radius: 8px;
    margin-bottom: 25px;
}
.form-row {
    display: flex;
    gap: 15px;
    margin-bottom: 15px;
}
.form-group {
    flex: 1;
    display: flex;
    flex-direction: column;
}
.form-group label {
    font-size: 0.85rem;
    font-weight: bold;
    margin-bottom: 5px;
}
.form-group input, .form-group textarea {
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
}
.form-actions {
    display: flex;
    gap: 10px;
}
.btn-submit {
    background-color: #43a047;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: bold;
}
.btn-cancel {
    background-color: #757575;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}
.error { color: red; margin-top: 10px; }

.donations-list-wrapper {
    margin-top: 20px;
}

/* Animations transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
.list-move {
  transition: transform 0.5s ease;
}

.empty {
    text-align: center;
    color: #999;
    margin: 30px 0;
}
</style>
