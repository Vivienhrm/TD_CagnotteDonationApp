<template>
  <div class="donation-item">
    <div class="donation-main">
        <div class="date-time">{{ dbDateHourToFr(donation.created_at) }}</div>
        <div class="donator">
            <strong>{{ donation.donator || 'Anonyme' }}</strong>
        </div>
        <div class="amount">{{ formatAmount(donation.amount) }}</div>
    </div>
    <div v-if="donation.comment" class="comment">
        {{ cutText(donation.comment) }}
    </div>
    <div class="actions">
        <button @click="$emit('edit', donation)" class="btn btn-sm btn-edit">Éditer</button>
        <button @click="confirmDelete" class="btn btn-sm btn-delete">Supprimer</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Donation',
  props: {
    donation: {
        type: Object,
        required: true
    }
  },
  methods: {
    confirmDelete() {
        if (confirm("Supprimer cette donation ?")) {
            this.$emit('delete', this.donation.id);
        }
    }
  }
}
</script>

<style scoped>
.donation-item {
    background: #fdfdfd;
    border: 1px solid #eee;
    border-radius: 6px;
    padding: 12px;
    margin-bottom: 10px;
    transition: all 0.3s ease;
}
.donation-item:hover {
    box-shadow: 0 2px 5px rgba(0,0,0,0.05);
}
.donation-main {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 5px;
}
.date-time {
    font-size: 0.8rem;
    color: #888;
}
.donator {
    flex: 1;
    margin-left: 15px;
}
.amount {
    font-weight: bold;
    color: #2e7d32;
}
.comment {
    font-size: 0.9rem;
    color: #555;
    font-style: italic;
    margin: 5px 0;
}
.actions {
    display: flex;
    gap: 10px;
    justify-content: flex-end;
}
.btn-sm {
    padding: 4px 8px;
    font-size: 0.75rem;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    color: white;
}
.btn-edit { background-color: #03a9f4; }
.btn-delete { background-color: #ef5350; }
</style>
