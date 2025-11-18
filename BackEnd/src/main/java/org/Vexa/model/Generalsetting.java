package org.Vexa.model;

public class Generalsetting {
    private Integer settingId;

    private String settingName;

    private String settingIntroduce;

    public Integer getSettingId() {
        return settingId;
    }

    public void setSettingId(Integer settingId) {
        this.settingId = settingId;
    }

    public String getSettingName() {
        return settingName;
    }

    public void setSettingName(String settingName) {
        this.settingName = settingName == null ? null : settingName.trim();
    }

    public String getSettingIntroduce() {
        return settingIntroduce;
    }

    public void setSettingIntroduce(String settingIntroduce) {
        this.settingIntroduce = settingIntroduce == null ? null : settingIntroduce.trim();
    }
}