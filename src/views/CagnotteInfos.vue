<template>
  <div class="cagnotte-infos" v-if="cagnotte">
    <div class="info-grid">
        <div class="info-item full">
            <label>Description</label>
            <p>{{ cagnotte.description }}</p>
        </div>
        <div class="info-item">
            <label>Date limite</label>
            <p>{{ dbDateToFr(cagnotte.end_date) }} ({{ daysRemaining }} jours restants)</p>
        </div>
        <div class="info-item">
            <label>Objectif à atteindre</label>
            <p>{{ formatAmount(cagnotte.goal) }}</p>
        </div>
        <div class="info-item">
            <label>Montant récolté</label>
            <p>{{ formatAmount(currentAmount) }}</p>
        </div>
        <div class="info-item">
            <label>Montant restant</label>
            <p>{{ formatAmount(cagnotte.goal - currentAmount) }}</p>
        </div>
        <div class="info-item">
            <label>% d'atteinte</label>
            <p>{{ progress }}%</p>
        </div>
        <div class="info-item">
            <label>Nombre de donations</label>
            <p>{{ donationCount }}</p>
        </div>
        <div class="info-item">
            <label>Donation moyenne</label>
            <p>{{ formatAmount(averageDonation) }}</p>
        </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CagnotteInfos',
  props: {
    cagnotte: { type: Object, required: true }
  },
  computed: {
    // Note: The API GET /api/cagnottes/:id response usually includes donations or totals.
    // If not, we might need a separate fetch. Based on TD, we display these stats here.
    donationCount() {
        return this.cagnotte.donations?.length || 0;
    },
    currentAmount() {
        return this.cagnotte.donations?.reduce((sum, d) => sum + parseFloat(d.amount), 0) || 0;
    },
    progress() {
        if (!this.cagnotte.goal) return 0;
        return Math.round((this.currentAmount / this.cagnotte.goal) * 100);
    },
    daysRemaining() {
        const today = new Date();
        const end = new Date(this.cagnotte.end_date);
        const diff = end - today;
        return Math.ceil(diff / (1000 * 60 * 60 * 24));
    },
    averageDonation() {
        if (this.donationCount === 0) return 0;
        return this.currentAmount / this.donationCount;
    }
  }
}
</script>

<style scoped>
.info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
}
.info-item label {
    display: block;
    color: #888;
    font-size: 0.8em;
    margin-bottom: 5px;
    text-transform: uppercase;
}
.info-item p {
    font-size: 1.1em;
    font-weight: 500;
}
.info-item.full {
    grid-column: span 2;
}
</style>
