import Navbar from './Navbar'
import Footer from './Footer'

// Think of this as the "frame" around a picture — every public page
// gets slotted in as {children}, with the same nav bar on top and
// footer at the bottom, so we don't repeat that code on every page.
export default function PublicLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </>
  )
}
