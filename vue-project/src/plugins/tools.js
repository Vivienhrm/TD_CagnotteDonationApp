export default {
    install(app, options) {
        app.mixin({
            methods: {
                dateToDB(date) {
                    if (!date) return '';
                    const [day, month, year] = date.split('/');
                    return `${year}-${month}-${day}`;
                },
                dbDateToFr(date) {
                    if (!date) return '';
                    const [year, month, day] = date.split('-');
                    return `${day}/${month}/${year}`;
                },
                dbDateHourToFr(date) {
                    if (!date) return '';
                    const d = new Date(date);
                    return d.toLocaleString('fr-FR');
                },
                formatAmount(amount) {
                    if (amount === undefined || amount === null) return '';
                    return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(amount);
                },
                cutText(text) {
                    const limit = options?.cutTextLength || 100;
                    if (!text) return '';
                    if (text.length <= limit) return text;
                    return text.substring(0, limit) + '...';
                }
            }
        });

        app.directive('focus', {
            mounted(el) {
                el.focus();
            }
        });
    }
}
