<template functional>
    <div class="page home">
        <section class="section section__landing">
            <div class="section__heading">
                <span class="section__title">About Astro Chat</span>
            </div>
            <div class="section__content">
                <p
                    class="section__lead"
                >Created to allow real time communication between users in groups via multiple rooms</p>
                <div class="section__graphic">
                    <img src="@/assets/img/undraw_programmer_imem.svg" alt />
                </div>
                <span class="heading-lg center">Features</span>
                <div class="features">
                    <div class="features__item">
                        <span>
                            <a href="https://expressjs.com/" class="btn btn--info">Express</a> as the web framework on the server
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            Implements stateless authentication with
                            <a
                                href="https://jwt.io/"
                                class="btn btn--info"
                            >JWT</a> tokens
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            Authenticates
                            <a href="https://jwt.io/" class="btn btn--info">JWT</a>
                            and social authentication using
                            <a
                                href="http://www.passportjs.org/"
                                class="btn btn--danger"
                            >passport</a>
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            Hashes passwords using the
                            <a
                                href="https://www.npmjs.com/package/bcryptjs"
                                class="btn btn--success"
                            >bcryptjs</a> package
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            Real time communication to the server using
                            <a
                                href="https://socket.io/"
                                class="btn btn--info"
                            >Socket IO</a>
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            <a href="https://www.mongodb.com/" class="btn btn--info">MongoDB</a> and
                            <a
                                href="https://www.mongodb.com/cloud/atlas"
                                class="btn btn--coral"
                            >Mongo Atlas</a> is used for storing and querying data
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            Server logging is done with
                            <a
                                href="https://www.npmjs.com/package/winston"
                                class="btn btn--info"
                            >Winston</a> and
                            <a
                                href="https://www.npmjs.com/package/morgan"
                                class="btn btn--coral"
                            >Morgan</a>
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            <a
                                href="https://www.npmjs.com/package/concurrently"
                                class="btn btn--danger"
                            >Concurrently</a> is used to run both the server and client at the same time
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            <a href="https://vuejs.org/" class="btn btn--success">Vue JS</a> is used as the frontend framework
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            <a href="https://travis-ci.org/" class="btn btn--info">Travis CI</a> is incorporated for continuous integration
                        </span>
                    </div>
                    <div class="features__item">
                        <span>
                            <a href="https://www.heroku.com/" class="btn btn--purple">Heroku</a> is used for production deployment
                        </span>
                    </div>
                </div>
                <div class="center">
                    <a href="https://icons8.com/" class="btn btn--info">Icons by Icons8</a>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
// @ is an alias to /client
export default {
    name: 'About',
    props: [],
    components: {},
    mounted() {}
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/components/feature.scss';
</style>
