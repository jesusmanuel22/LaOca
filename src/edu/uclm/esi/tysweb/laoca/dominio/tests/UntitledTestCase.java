package edu.uclm.esi.tysweb.laoca.dominio.tests;
import java.util.regex.Pattern;
import java.util.concurrent.TimeUnit;
import org.junit.*;
import static org.junit.Assert.*;
import static org.hamcrest.CoreMatchers.*;
import org.openqa.selenium.*;
import org.openqa.selenium.chrome.ChromeDriver;
import org.openqa.selenium.firefox.FirefoxDriver;
import org.openqa.selenium.support.ui.Select;
import edu.uclm.esi.tysweb.laoca.dao.*;

public class UntitledTestCase {
  private WebDriver driver, driver2;
  private String baseUrl;
  private boolean acceptNextAlert = true;
  private StringBuffer verificationErrors = new StringBuffer();
  
  @Before
  public void setUp() throws Exception {
    driver = new FirefoxDriver();
    driver2= new ChromeDriver();
    baseUrl = "https://www.katalon.com/";
    driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
    
  }

  @Test
  public void testUntitledTestCase() throws Exception {
    driver.get("http://localhost:8080/LaOca2017/");
    driver.findElement(By.linkText("Crea Tu Cuenta")).click();
    driver.findElement(By.id("email")).click();
    driver.findElement(By.id("email")).clear();
    driver.findElement(By.id("email")).sendKeys("prueba@prueba.com");
    driver.findElement(By.id("pwd1")).clear();
    driver.findElement(By.id("pwd1")).sendKeys("12345");
    assertEquals("12345", driver.findElement(By.id("pwd1")).getAttribute("value"));
    driver.findElement(By.id("pwd2")).clear();
    driver.findElement(By.id("pwd2")).sendKeys("12345");
    assertEquals("12345", driver.findElement(By.id("pwd2")).getAttribute("value"));
    driver.findElement(By.cssSelector("button.login100-form-btn")).click();
    driver.findElement(By.id("email")).click();
    driver.findElement(By.id("email")).clear();
    driver.findElement(By.id("email")).sendKeys("prueba@prueba.com");
    assertEquals("prueba@prueba.com", driver.findElement(By.id("email")).getAttribute("value"));
    driver.findElement(By.id("pwd1")).clear();
    driver.findElement(By.id("pwd1")).sendKeys("12345");
    assertEquals("12345", driver.findElement(By.id("pwd1")).getAttribute("value"));
    driver.findElement(By.cssSelector("button.login100-form-btn")).click();
    driver.findElement(By.xpath("//button[@onclick=\"javascript: window.location.href='logout.jsp'\"]")).click();
    driver.findElement(By.id("email")).click();
    driver.findElement(By.id("email")).clear();
    driver.findElement(By.id("email")).sendKeys("prueba@prueba.com");
    assertEquals("prueba@prueba.com", driver.findElement(By.id("email")).getAttribute("value"));
    driver.findElement(By.id("pwd1")).clear();
    driver.findElement(By.id("pwd1")).sendKeys("1234");
    assertEquals("1234", driver.findElement(By.id("pwd1")).getAttribute("value"));
    driver.findElement(By.cssSelector("button.login100-form-btn")).click();
  }

  @After
  public void tearDown() throws Exception {
    driver.quit();
    String verificationErrorString = verificationErrors.toString();
    if (!"".equals(verificationErrorString)) {
      fail(verificationErrorString);
    }
  }

  private boolean isElementPresent(By by) {
    try {
      driver.findElement(by);
      return true;
    } catch (NoSuchElementException e) {
      return false;
    }
  }

  private boolean isAlertPresent() {
    try {
      driver.switchTo().alert();
      return true;
    } catch (NoAlertPresentException e) {
      return false;
    }
  }

  private String closeAlertAndGetItsText() {
    try {
      Alert alert = driver.switchTo().alert();
      String alertText = alert.getText();
      if (acceptNextAlert) {
        alert.accept();
      } else {
        alert.dismiss();
      }
      return alertText;
    } finally {
      acceptNextAlert = true;
    }
  }
}
