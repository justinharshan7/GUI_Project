import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<any>(JSON.parse(localStorage.getItem('user') || 'null'))

  const isLoggedIn = computed(() => !!token.value)

  const login = async (username: string, password: string) => {
    const response = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password, expiresInMins: 60 })
    })

    if (!response.ok) throw new Error('Invalid credentials')

    const data = await response.json()
    token.value = data.token
    user.value = data
    localStorage.setItem('token', data.token)
    localStorage.setItem('user', JSON.stringify(data))
    return data
  }

  const logout = () => {
  token.value = null
  user.value = null
  localStorage.removeItem('token')
  localStorage.removeItem('user')
  localStorage.removeItem('cart')
  localStorage.removeItem('favourites')
  window.location.href = '/'
}

  // Restore from localStorage on init
if (localStorage.getItem('token')) {
  token.value = localStorage.getItem('token')
  user.value = JSON.parse(localStorage.getItem('user') || 'null')
}

  return { token, user, isLoggedIn, login, logout }
})