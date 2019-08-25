<template functional>
    <div class="page notfound">
        <section class="section mt-6 section--notfound">
            <div class="section__heading">
                <span class="section__title">Oops! Page Not Found</span>
            </div>
            <div class="section__content">
                <p class="section__lead">404 Error, The page you were looking for couldn't be found</p>
                <div class="notfound__dp">
                    <img src="@/assets/img/undraw_empty_xct9.svg" alt="404 Not Found" />
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    name: 'NotFound'
};
</script>

<style lang="scss" scoped>
.section {
    display: flex;
    flex-flow: column;
    align-items: center;
    justify-content: center;
}
.section__content {
    padding-bottom: 140px;
}

.section__heading {
    @include respond(phone) {
        margin-top: 100px;
    }
}

.notfound {
    &__dp {
        margin: 5rem 0 0 0;

        @include respond(phone) {
            margin: 2rem 0 0 0;
        }

        & img {
            width: 65%;

            @include respond(phone) {
                width: 100%;
            }
        }
    }
}
</style>
