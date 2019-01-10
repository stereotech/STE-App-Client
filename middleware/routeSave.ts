export default function ({ route, redirect }) {
  if (!process.server) {
    console.log('Set route')
    const prevRoute = localStorage.getItem('route')
    if (prevRoute != null) return redirect()
    localStorage.setItem('route', route.fullPath)
  }
}
