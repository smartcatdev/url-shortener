<template>
    <b-container>
        <b-row>
            <b-col>
                <b-alert show v-if="form.error" variant="danger">Please enter a valid URL</b-alert>
                <b-alert show v-if="form.shortUrl" variant="info">{{ form.shortUrl }}</b-alert>

                <b-form @submit="submit" @reset="reset">

                    <b-form-group
                        id="user-url-group"
                        label="Original URL"
                        label-for="user-url"
                    >
                        <b-form-input
                            id="user-url"
                            type="url"
                            placeholder="Enter your URL"
                            v-model="form.userUrl"
                            required
                        ></b-form-input>
                    </b-form-group>
                    
                    <div class="buttons">
                        <b-button class="button" type="reset" variant="danger">Reset</b-button>
                        <b-button class="button" type="submit" variant="primary">Shorten URL</b-button>
                    </div>

                </b-form>
            </b-col>
        </b-row>
    </b-container>

</template>

<script>

import urlShortener from '@/services/urlShortener'

export default {
    name: 'welcome',
    data() {
        return {
            form: {
                error: false,
                userUrl: 'https://shopify.ca',
                shortUrl: '',
            }
        }
    },
    methods: {
        validateUrl(str) {
            let pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
                '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
                '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
                '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
                '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
                '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
            return !!pattern.test(str);
        },
        submit(e) {
            e.preventDefault()

            // console.log(urlShortener.shortenUrl(this.form.userUrl))
            const url = new urlShortener(this.form.userUrl)
            this.form.shortUrl = url.getShortUrl()

        },
        reset(e) {
            e.preventDefault()
            this.form.userUrl = ''
            this.form.shortUrl = ''
            this.form.error = false
        }
    },
}
</script>

<style lang="scss" scoped>
.buttons {
    margin-top: 15px;
    .button:first-child {
        margin-right: 10px;
    }
}
</style>