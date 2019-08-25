<template functional>
    <footer class="footer section__footer">
        <div class="footer__content">
            <div class="footer__left">
                <span>Copyright &copy; 2018 Lu-Vuong Le</span>
            </div>
            <div class="footer__right">
                <span>Created under the MIT License</span>
                <a
                    href="https://github.com/luvuong-le/astro-chat"
                    target="_blank"
                    class="nav__link"
                >
                    <ion-icon name="logo-github" class="footer__icon"></ion-icon>
                </a>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    name: 'Footer'
};
</script>

<style lang="scss">
@import '@/assets/scss/components/footer.scss';
</style>
