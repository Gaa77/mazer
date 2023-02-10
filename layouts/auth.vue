<script setup>
useHead({
    link: [  
        { rel: 'stylesheet', href: 'assets/css/main/app.css' },
        { rel: 'stylesheet', href: 'assets/css/pages/auth.css' }
    ]
});
function initTheme() {
    var e = document.body;
    'theme-dark' == localStorage.getItem('theme') ? e.classList.add('theme-dark') : e.classList.add('theme-dark');
}
onMounted(() => {
    initTheme();
});
</script>
<template>
    <div id="auth">
        <slot />
    </div>
</template>
