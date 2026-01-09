<template>
  <div class="cagnotte-card" :class="statusClass" @click="goToDetails">
    <h3>{{ cagnotte.name }}</h3>
    <div class="description">{{ cutText(cagnotte.description) }}</div>
    
    <div class="progress-bar">
        <div class="progress" :style="{ width: Math.min(100, progress) + '%' }"></div>
    </div>
    <div class="stats">
        <span :class="{ over: isOverfunded }">
            {{ progress }}% 
            <small>(Reste : {{ formatAmount(remainingAmount) }})</small>
        </span>
        <span>Fin le : {{ dbDateToFr(cagnotte.end_date) }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cagnotte',
  props: {
    cagnotte: {
        type: Object,
        required: true
    }
  },
  computed: {
    progress() {
        if (!this.cagnotte.goal || !this.cagnotte.current_amount) return 0;
        const p = (this.cagnotte.current_amount / this.cagnotte.goal) * 100;
        return Math.round(p); 
    },
    daysRemaining() {
        const today = new Date();
        const end = new Date(this.cagnotte.end_date);
        const diffTime = end - today;
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    },
    isOverfunded() {
        return this.remainingAmount < 0;
    },
    remainingAmount() {
        return this.cagnotte.goal - (this.cagnotte.current_amount || 0);
    },
    statusClass() {
        const diff = this.daysRemaining;
        if (diff > 30) return 'status-blue';
        if (diff >= 5) return 'status-orange';
        return 'status-red';
    }
  },
  methods: {
    goToDetails() {
        this.$router.push(`/cagnottes/${this.cagnotte.id}`);
    }
  }
}
</script>

<style scoped>
.cagnotte-card {
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 16px;
    cursor: pointer;
    transition: transform 0.2s;
    background-color: white; /* Default background */
}
.cagnotte-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.description {
    color: #666;
    margin: 10px 0;
    font-size: 0.9em;
}

.progress-bar {
    height: 8px;
    background-color: #eee;
    border-radius: 4px;
    margin: 10px 0;
    overflow: hidden;
}

.progress {
    height: 100%;
    background-color: #4CAF50;
}

.stats {
    display: flex;
    justify-content: space-between;
    font-size: 0.8em;
    color: #555;
    margin-top: 8px;
}
.over { color: #2e7d32; font-weight: bold; }
.stats small { color: #666; font-weight: normal; }
.status-blue {
    background-color: #e3f2fd;
}
.status-orange {
    background-color: #fff3e0;
}
.status-red {
    background-color: #ffebee;
}
</style>
