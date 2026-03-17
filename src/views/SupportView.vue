<template>
  <div>
    <!-- Header -->
    <div class="relative bg-gradient-to-r from-emerald-600 to-teal-500 dark:from-[#021018] dark:to-[#031520] rounded-3xl p-8 mb-8 text-white overflow-hidden border border-transparent dark:border-emerald-500/30">
      <div class="absolute -top-10 -right-10 w-40 h-40 dark:bg-emerald-500/20 rounded-full blur-3xl"></div>
      <div class="absolute -bottom-10 -left-10 w-40 h-40 dark:bg-teal-500/20 rounded-full blur-3xl"></div>
      <div class="relative z-10">
        <h1 class="text-4xl font-bold mb-2">Support Center 🎧</h1>
        <p class="text-emerald-100 text-lg">We're here to help you 24/7</p>
      </div>
    </div>

    <!-- Help Topics -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div
        v-for="topic in helpTopics"
        :key="topic.title"
        class="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 p-5 text-center cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all duration-200 group"
      >
        <div class="text-3xl mb-3">{{ topic.icon }}</div>
        <h3 class="font-bold text-gray-900 dark:text-white text-sm group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{{ topic.title }}</h3>
        <p class="text-gray-500 dark:text-gray-400 text-xs mt-1">{{ topic.desc }}</p>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">

      <!-- FAQ Section -->
      <div class="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 p-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Frequently Asked Questions</h2>
        <div class="space-y-3">
          <div
            v-for="faq in faqs"
            :key="faq.question"
            class="border border-gray-100 dark:border-white/10 rounded-xl overflow-hidden"
          >
            <button
              @click="faq.open = !faq.open"
              class="w-full flex items-center justify-between p-4 text-left hover:bg-emerald-50 dark:hover:bg-emerald-900/20 transition-colors"
            >
              <span class="font-medium text-gray-900 dark:text-white text-sm">{{ faq.question }}</span>
              <span class="text-emerald-500 transition-transform duration-200 flex-shrink-0 ml-2" :class="faq.open ? 'rotate-180' : ''">▾</span>
            </button>
            <div v-if="faq.open" class="px-4 pb-4 text-gray-600 dark:text-gray-400 text-sm">
              {{ faq.answer }}
            </div>
          </div>
        </div>
      </div>

      <!-- Contact Form -->
      <div class="bg-white dark:bg-[#111111] rounded-2xl border border-gray-200 dark:border-white/10 p-6">
        <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Us</h2>
        
        <!-- Success Message -->
        <div v-if="submitted" class="bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-500/30 rounded-xl p-4 text-center mb-4">
          <p class="text-2xl mb-2">✅</p>
          <p class="text-emerald-600 dark:text-emerald-400 font-bold">Message Sent!</p>
          <p class="text-gray-500 dark:text-gray-400 text-sm mt-1">We'll get back to you within 24 hours</p>
        </div>

        <div v-else class="space-y-4">
          <div>
            <label class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1 block">Full Name</label>
            <input
              v-model="form.name"
              type="text"
              placeholder="Your name"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div>
            <label class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1 block">Email Address</label>
            <input
              v-model="form.email"
              type="email"
              placeholder="name@example.com"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div>
            <label class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1 block">Subject</label>
            <input
              v-model="form.subject"
              type="text"
              placeholder="How can we help?"
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all"
            />
          </div>
          <div>
            <label class="text-gray-700 dark:text-gray-300 text-sm font-medium mb-1 block">Message</label>
            <textarea
              v-model="form.message"
              rows="4"
              placeholder="Describe your issue..."
              class="w-full px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#1a1a1a] text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none"
            ></textarea>
          </div>
          <button
            @click="handleSubmit"
            class="w-full bg-emerald-600 hover:bg-teal-500 text-white font-bold py-3 rounded-xl transition-all duration-200 hover:shadow-lg hover:shadow-emerald-200 dark:hover:shadow-emerald-900"
          >
            Send Message 📨
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'

const submitted = ref(false)

const form = reactive({
  name: '',
  email: '',
  subject: '',
  message: ''
})

const helpTopics = [
  { icon: '📦', title: 'Track Order', desc: 'Check your order status' },
  { icon: '↩️', title: 'Returns', desc: 'Easy 30-day returns' },
  { icon: '💳', title: 'Payments', desc: 'Payment issues & refunds' },
  { icon: '🔐', title: 'Account', desc: 'Login & account help' },
]

const faqs = reactive([
  { question: 'How do I track my order?', answer: 'You can track your order by visiting the Orders section in your account dashboard. You will receive email updates at every stage.', open: false },
  { question: 'What is your return policy?', answer: 'We offer a 30-day hassle-free return policy. Items must be in original condition with tags attached.', open: false },
  { question: 'How long does shipping take?', answer: 'Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business days delivery.', open: false },
  { question: 'Is my payment information secure?', answer: 'Yes! We use industry-standard SSL encryption to protect all payment information. We never store your card details.', open: false },
  { question: 'Can I change or cancel my order?', answer: 'Orders can be modified or cancelled within 1 hour of placement. After that, please contact our support team.', open: false },
])

const handleSubmit = () => {
  if (form.name && form.email && form.message) {
    submitted.value = true
  }
}
</script>