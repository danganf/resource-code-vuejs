@extends('layout')

@section('content')

    <div id="primary" class="content-area">
        <main id="main" class="site-main" style="margin-top: 60px">
            <c-product-session url_product_detail="{{route('product_detail', [ '_SKU_' ])}}"></c-product-session>
        </main>
    </div>
    <vue-snotify></vue-snotify>

@stop
