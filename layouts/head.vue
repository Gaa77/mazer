<script setup>
useHead({
    link: [
        { rel: 'stylesheet', href: 'assets/css/main/app.css' },
        { rel: 'stylesheet', href: 'assets/css/main/app-dark.css' },
        { rel: 'stylesheet', href: 'assets/css/shared/iconly.css' }
    ],
    script: [
        {
            src: 'assets/js/bootstrap.js',
            type: 'text/javascript'
        },
        {
            src: 'assets/js/app.js',
            type: 'text/javascript'
        },
        {
            src: 'assets/js/pages/dashboard.js',
            type: 'text/javascript'
        },
        {
            src: 'assets/extensions/apexcharts/apexcharts.min.js',
            type: 'text/javascript'
        }
    ]
});
function initTheme() {
    var e = document.body;
    'theme-dark' == localStorage.getItem('theme') ? e.classList.add('theme-dark') : e.classList.add('theme-light');
}
onMounted(() => {
    initTheme();
   
});
</script>
<template>
    <Sidebar></Sidebar>
    <div id="main">
        <headerr></headerr>
        <slot />
        <footer></footer>
    </div>
</template>
