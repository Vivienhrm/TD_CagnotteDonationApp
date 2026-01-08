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
.btn-edit { background-color: #03a9f4; }
.btn-delete { background-color: #ef5350; }
</style>
