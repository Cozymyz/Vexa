package org.Vexa.utils;

import org.springframework.http.HttpStatus;
import org.springframework.validation.BindException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.ObjectError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

public class ExceptionUtils {
    private HttpStatus getStatus(HttpServletRequest request) {
        Integer statusCode = (Integer) request.getAttribute("javax.servlet.error.status_code");
        if (statusCode == null) {
            return HttpStatus.INTERNAL_SERVER_ERROR;
        }
        return HttpStatus.valueOf(statusCode);
    }

    // 数据校验异常
    @ExceptionHandler(value = {MethodArgumentNotValidException.class} )
    //@ExceptionHandler(BindException.class)
    public Msg handlevalidException(MethodArgumentNotValidException e){
        BindingResult result = e.getBindingResult();
        List<String> errors = new ArrayList<>();
        // 如果 BindingResult 的 hasErrors 方法返回true，则表示有错误信息
        if (result.hasErrors()) {
            List<ObjectError> allErrors = result.getAllErrors();
            /// 遍历错误信息，返回给前端
            for (ObjectError error : allErrors) {
                //           errors.add(error.getDefaultMessage());
            }
        }
        System.out.println("-------------------------------------");
        return Msg.fail().add("errors",errors).add("info","some thing wrong");
    }

    //@ExceptionHandler(value = {MethodArgumentNotValidException.class} )
    @ExceptionHandler(BindException.class)
    public Msg handlevalidException2(BindException e){
        BindingResult result = e.getBindingResult();
        List<String> errors = new ArrayList<>();
        // 如果 BindingResult 的 hasErrors 方法返回true，则表示有错误信息
        if (result.hasErrors()) {
            List<ObjectError> allErrors = result.getAllErrors();
            /// 遍历错误信息，返回给前端
            for (ObjectError error : allErrors) {
                errors.add(error.getDefaultMessage());
            }
        }
        System.out.println("-------------------------------------");
        return Msg.fail().add("errors",errors).add("info","some thing wrong");
    }

    // 捕捉其他所有异常
    @ExceptionHandler(Exception.class)
    public Msg globalException(HttpServletRequest request, Throwable ex) {
        return Msg.code(getStatus(request).value()).add("info", "访问出错，无法访问: " + ex.getMessage());
    }
}
