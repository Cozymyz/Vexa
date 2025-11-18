package org.Vexa.model;

public class Userlocation {
    private Integer userlocationId;

    private String userlocationName;

    private String userlocationIntroduce;

    public Integer getUserlocationId() {
        return userlocationId;
    }

    public void setUserlocationId(Integer userlocationId) {
        this.userlocationId = userlocationId;
    }

    public String getUserlocationName() {
        return userlocationName;
    }

    public void setUserlocationName(String userlocationName) {
        this.userlocationName = userlocationName == null ? null : userlocationName.trim();
    }

    public String getUserlocationIntroduce() {
        return userlocationIntroduce;
    }

    public void setUserlocationIntroduce(String userlocationIntroduce) {
        this.userlocationIntroduce = userlocationIntroduce == null ? null : userlocationIntroduce.trim();
    }
}