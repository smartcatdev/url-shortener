import { mount } from '@vue/test-utils'
import UrlForm from '@/components/UrlForm.vue'
import Vue from 'vue'
import BootstrapVue from 'bootstrap-vue'

Vue.use(BootstrapVue)

describe('UrlForm.vue', () => {
    test('if there\'s a form error, show the error message', async () => {
        const wrapper = mount(UrlForm)
        wrapper.setData({
            form: {
                error: true
            }
        })
        await wrapper.find('.submit').trigger('click')
        expect(wrapper.find('.alert-error').exists()).toBe(true)    
    })

    test('if there\'s no form error, hide error message', async () => {
        const wrapper = mount(UrlForm)
        wrapper.setData({
            form: {
                error: false
            }
        })
        await wrapper.find('.submit').trigger('click')
        expect(wrapper.find('.alert-error').exists()).toBe(false)
    })

    test('if a valid URL submitted, the form submits', () => {
        const wrapper = mount(UrlForm)
        const input = wrapper.find('[data-test-id="urlform-userurl"]')
        input.setValue('https://google.ca')
        wrapper.trigger('submit')

        const formSubmittedCalls = wrapper.emitted('formSubmitted')
        expect(formSubmittedCalls).toHaveLength(1)
    })

    test('if an invalid URL submitted, the form doesnt submit', () => {
        const wrapper = mount(UrlForm)
        const input = wrapper.find('[data-test-id="urlform-userurl"]')
        input.setValue('123')
        wrapper.trigger('submit')

        const formSubmittedCalls = wrapper.emitted('formSubmitted')
        expect(formSubmittedCalls).toBeUndefined()
    })

})