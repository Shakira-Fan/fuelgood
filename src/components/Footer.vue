<template>
  <!-- <div class="contact">聯絡資訊</div> -->

  <div class="footer">
    <div class="contact">
      <h2>聯絡資訊</h2>
      <div class="contact-methods">
        <div class="link">
          <span class="material-icons"> email </span>
          <a href="mailto:contact@wels.com.tw">contact@wels.com.tw</a>
        </div>
        <div class="link">
          <span class="material-icons"> smartphone </span>
          <a href="tel:0922000122">0922000122</a>
        </div>
        <div class="link">
          <span class="material-icons">
            <span class="material-icons"> question_answer </span>
          </span>
          線上客服
        </div>
      </div>
    </div>
    <div class="copyright">Copyright &copy; 2022 WELS.</div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
h2 {
  font-size: 2.5rem;
  max-width: 110rem;
  margin: 1rem auto;
  border-bottom: 2px solid var(--color-primary);
  padding: 2.5rem;
}

a {
  text-decoration: none;
  color: #000;
}
a:hover {
  color: var(--color-secondary);
}
.contact {
  background-color: var(--color-grey);
  padding: 1rem 0;
}
.contact-methods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-items: center;
  padding: 1.5rem;
}
.material-icons {
  font-size: 3rem;
  margin-right: 0.5rem;
}
.link {
  font-size: 2rem;
  margin: 0.2rem auto;
  display: flex;
}
.link:hover {
  cursor: pointer;
  color: var(--color-secondary);
}
label {
  width: 100%;
  padding: 1.5rem;
  font-size: 1.8rem;
}
input {
  box-sizing: border-box;
  width: 25%;
  padding: 1.3rem;
  border-radius: 4px;
  border: none;
  border-bottom: 2px solid var(--color-grey);
  outline: none;
}
.legal {
  background-color: var(--color-primary);
  padding: 1.5rem;
  font-weight: bold;
}
.copyright {
  color: #fff;
  background-color: var(--color-secondary);
  padding: 2rem;
}
</style>
