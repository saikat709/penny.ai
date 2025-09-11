package com.penny.utils;

import com.penny.models.UserEntity;

public class UserContextProvider {

    private static final ThreadLocal<UserEntity> userContext = new ThreadLocal<>();

    public static void setUser(UserEntity user) {
        userContext.set(user);
    }

    public static UserEntity getUser() {
        return userContext.get();
    }

    public static void clear() {
        userContext.remove();
    }
}
