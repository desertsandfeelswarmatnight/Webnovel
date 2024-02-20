window.addEventListener("load",function() {

    let login_validation = 0, password1_validation = 0, password2_validation = 0, email_validation = 0, name_validation = 0

    const db = firebase.firestore()

    document.querySelector('#btn').addEventListener("click", e=> {
        e.preventDefault();

        let 이메일 = document.getElementById('email').value
        let 패스워드 = document.querySelector("#password1").value
        let 이름 = document.getElementById('nickName').value

        firebase.auth().createUserWithEmailAndPassword(이메일, 패스워드).then((result)=>{
            console.log(result.user)

            db.collection('USER').doc(result.user.uid).set({
                이메일: 이메일,
                패스워드: 패스워드,
                이름: 이름
            })

            result.user.updateProfile( {displayName: 이름} ).then(()=>{
                console.log(`이름 : ${result.user.displayName}`)
                alert("회원가입 성공!!")
                window.location.href = "index.html"
            })

        })
    })
    
    
    document.querySelector("#ID").addEventListener("input",function() {

        if(login_validation == 0 || password1_validation == 0 || password2_validation == 0 || email_validation == 0 || name_validation == 0)
            {   document.getElementById('btn').disabled = true;     }
        if(login_validation == 1 && password1_validation == 1 && password2_validation == 1 && email_validation == 1 && name_validation == 1)
            {   document.getElementById('btn').disabled = false;    }

        console.log("(id) login: " + login_validation + "  pw1: " + password1_validation + "  pw2: " + password2_validation + "  email: " + email_validation + " name: " + name_validation);

        let valueOfid = document.getElementById('ID').value;

        if(valueOfid == ""){
            //ID가 입력되지 않음
            login_validation = 0;
            document.querySelectorAll('.sign_up-validation')[0].innerText = "아이디는 필수 입력값입니다.";
        }else{
            //ID가 입력되고
            if(valueOfid.length < 5){
                //5자 이하면
                login_validation = 0;
                document.querySelectorAll('.sign_up-validation')[0].innerText = "아이디는 5자 이상으로 입력해주세요.";
            }else{
                //5자 이상이고
                if(/^[0-9a-zA-Z]{5,11}$/i.test(valueOfid) == false){
                    //숫자 영문 조합이 아니면
                    login_validation = 0;
                    document.querySelectorAll('.sign_up-validation')[0].innerText = "올바른 아이디를 입력해주세요.";
                }else{
                    //숫자 영문 조합이면
                    login_validation = 1;
                    document.querySelectorAll('.sign_up-validation')[0].innerText = "아주 올바릅니다.";
                }
            }
        }
    });

    document.querySelector("#password1").addEventListener("input",function() {

        if(login_validation == 0 || password1_validation == 0 || password2_validation == 0 || email_validation == 0 || name_validation == 0)
            {   document.getElementById('btn').disabled = true;     }
        if(login_validation == 1 && password1_validation == 1 && password2_validation == 1 && email_validation == 1 && name_validation == 1)
            {   document.getElementById('btn').disabled = false;    }

        console.log("(pw1) login: " + login_validation + "  pw1: " + password1_validation + "  pw2: " + password2_validation + "  email: " + email_validation + " name: " + name_validation);

        if(document.querySelector("#password1").value == ""){
            //비밀번호가 입력되지 않음
            password1_validation = 0;
            document.querySelector("#password1").style.marginBottom = "0px";
            document.querySelectorAll('.sign_up-validation')[1].style.margin = "5px 0px 5px 0px";
            document.querySelectorAll('.sign_up-validation')[1].innerText = "비밀번호는 필수 입력값입니다.";
        }else{
            //비밀번호가 입력됐고
            if(document.querySelector("#password1").value.length < 8){
                //8자 이하면
                password1_validation = 0;
                document.querySelector("#password1").style.marginBottom = "0px";
                document.querySelectorAll('.sign_up-validation')[1].style.margin = "5px 0px 5px 0px";
                document.querySelectorAll('.sign_up-validation')[1].innerText = "비밀번호는 8자와 30자 사이로 입력해주세요.";
            }else{
                //8자 이상이고
                if(/[a-zA-Z]/g.test(document.querySelector("#password1").value) == false || /[0-9]/g.test(document.querySelector("#password1").value) == false || /[\{\}\[\]\/?.,;:|\)*~`!^\-_+<>@\#$%&\\\=\(\'\"]/g.test(document.querySelector("#password1").value) == false){
                    //영문,숫자,특수기호가 포함되지 않음
                    password1_validation = 0;
                    document.querySelector("#password1").style.marginBottom = "0px";
                    document.querySelectorAll('.sign_up-validation')[1].style.margin = "5px 0px 5px 0px";
                    document.querySelectorAll('.sign_up-validation')[1].innerText = "숫자, 영문 대소문자, 특수문자 중 두가지 이상으로 조합해 주십시오.";
                }else{
                    //영문,숫자,특수기호가 전부 포함되었으면
                    password1_validation = 1;
                    document.querySelector("#password1").style.marginBottom = "5px";
                    //document.querySelectorAll('.sign_up-validation')[1].innerText = "아주 올바른 비밀번호입니다!!!";
                    document.querySelectorAll('.sign_up-validation')[1].innerText = "";
                }
            }
        }
    });

    document.querySelector("#password2").addEventListener("input",function() {

        if(login_validation == 0 || password1_validation == 0 || password2_validation == 0 || email_validation == 0 || name_validation == 0)
            {   document.getElementById('btn').disabled = true;     }
        if(login_validation == 1 && password1_validation == 1 && password2_validation == 1 && email_validation == 1 && name_validation == 1)
            {   document.getElementById('btn').disabled = false;    }
        
        console.log("(pw2) login: " + login_validation + "  pw1: " + password1_validation + "  pw2: " + password2_validation + "  email: " + email_validation + " name: " + name_validation);
        
        if(document.querySelector("#password2").value == ""){
            //재확인 비밀번호가 입력되지 않음
            document.querySelectorAll('.sign_up-validation')[2].innerText = "비밀번호 재확인은 필수 입력값입니다.";
            password2_validation = 0;
        }else{
            //재확인 비밀번호가 입력됐고
            if(document.querySelector("#password1").value  !=  document.querySelector("#password2").value){
                //비밀번호와 재확인 비밀번호가 일치하지 않음
                password2_validation = 0;
                document.querySelectorAll('.sign_up-validation')[2].innerText = "비밀번호가 일치하지 않습니다.";
            }else{
                //비밀번호와 재확인 비밀번호가 일치하면
                password2_validation = 1;
                document.querySelectorAll('.sign_up-validation')[2].innerText = "";
            }
        }
    });

    document.querySelector("#email").addEventListener("input",function() {
        
        if(login_validation == 0 || password1_validation == 0 || password2_validation == 0 || email_validation == 0 || name_validation == 0)
            {   document.getElementById('btn').disabled = true;     }
        if(login_validation == 1 && password1_validation == 1 && password2_validation == 1 && email_validation == 1 && name_validation == 1)
            {   document.getElementById('btn').disabled = false;    }
        
        console.log("(email) login: " + login_validation + "  pw1: " + password1_validation + "  pw2: " + password2_validation + "  email: " + email_validation + " name: " + name_validation);

        if(document.querySelector("#email").value == ""){
            //이메일이 입력되지 않음
            email_validation = 0;
            document.querySelectorAll('.sign_up-validation')[3].innerText = "이메일은 필수 입력값입니다.";
        } else{
            //이메일이 입력됐고
            if(/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i.test(document.querySelector("#email").value) == false){
                //숫자와 영문,'-_.'와 '@'이 포함된 이메일 형식이 아니면
                email_validation = 0;
                document.querySelectorAll('.sign_up-validation')[3].innerText = "올바른 입력값을 입력해주세요";
            }else{
                //숫자와 영문,'-_.'와 '@'이 포함된 이메일 형식이면
                email_validation = 1;
                document.querySelectorAll('.sign_up-validation')[3].innerText = "";
            }
        }
    });

    document.getElementById('nickName').addEventListener("input",function() {
        if(login_validation == 0 || password1_validation == 0 || password2_validation == 0 || email_validation == 0 || name_validation == 0)
            {   document.getElementById('btn').disabled = true;     }
        if(login_validation == 1 && password1_validation == 1 && password2_validation == 1 && email_validation == 1 && name_validation == 1)
            {   document.getElementById('btn').disabled = false;    }

        console.log("(name) login: " + login_validation + "  pw1: " + password1_validation + "  pw2: " + password2_validation + "  email: " + email_validation + " name: " + name_validation);

        if(document.getElementById('nickName').value == ""){
            //이름이 입력되지 않음
            name_validation = 0;
            document.querySelectorAll('.sign_up-validation')[4].innerText = "이름은 필수 입력값입니다.";
        }else{
            //이름이 입력됌
            name_validation = 1;
            document.querySelectorAll('.sign_up-validation')[4].innerText = "";
        }
    })
});