<template>
  <!-- <div class="contact">聯絡資訊</div> -->

  <div class="footer">
    <div class="contact">
      <h2>聯絡資訊</h2>
      <div class="contact-methods">
        <div class="link">
          <span class="material-icons"> email </span>
          Email: contact@wels.com.tw
        </div>
        <div class="link">
          <span class="material-icons"> smartphone </span>
          電話：0800-XXX-XXX
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
  max-width: 120rem;
  margin: 2rem auto;
  border-bottom: 3px solid var(--color-primary);
  padding: 2rem;
}
.contact {
  background-color: var(--color-grey);
  padding: 4rem 0;
}
.contact-methods {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 3rem;
}
.material-icons {
  font-size: 3rem;
}
.link {
  font-size: 2.3rem;
}
.link:hover {
  cursor: pointer;
}
.subscribe {
  display: flex;
  flex-direction: column;
}
.subscribe-signup {
  margin: 5rem 0;
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
button {
  display: inline-block;
  font-size: 1.8rem;
}
.legal {
  background-color: var(--color-primary);
  padding: 1.5rem;
  font-weight: bold;
}
.copyright {
  color: var(--color-grey);
  background-color: var(--color-secondary);
  padding: 2rem;
}
</style>
